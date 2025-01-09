'use client';

import React, { useState, useRef, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  VStack,
  Text,
  Input,
  Button,
  Box,
  Group,
  Container,
} from '@chakra-ui/react';
import {
  StepsRoot,
  StepsList,
  StepsItem,
  StepsContent,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsCompletedContent,
} from "@/components/ui/steps";
import { LuFileText, LuPlus, LuCheckCircle } from "react-icons/lu";
import TransactionTypes from "@/components/create-proposal/TransactionTypes";
import TransactionList from "@/components/create-proposal/TransactionList";
import TransactionItem from "@/components/create-proposal/TransactionItem";
import Editor from "@/components/create-proposal/Editor";
import Markdown from "@/components/proposal/markdown";
import SubmitProposalButton from "@/components/create-proposal/SubmitProposalButton"; // Import the new component

interface Transaction {
  type: string;
  details: any;
}

interface FormData {
  proposalTitle: string;
  editorContent: string;
}

const CreateProposalPage = () => {
  const { control, handleSubmit, watch } = useForm<FormData>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentTransactionType, setCurrentTransactionType] = useState<string | null>(null);
  const [showTransactionOptions, setShowTransactionOptions] = useState(false);
  const proposalTitle = watch("proposalTitle");
  const editorContent = watch("editorContent");
  const [currentStep, setCurrentStep] = useState(0);

  const handleAddTransaction = useCallback(() => {
    setShowTransactionOptions(true);
  }, []);

  const handleSelectTransaction = useCallback((type: string) => {
    setCurrentTransactionType(type);
    setShowTransactionOptions(false);
  }, []);

  const handleAddTransactionDetails = useCallback(
    (transaction: Transaction) => {
      setTransactions((prevTransactions) => [...prevTransactions, transaction]);
      setCurrentTransactionType(null);
    },
    []
  );

  const handleCancelTransaction = useCallback(() => {
    setCurrentTransactionType(null);
  }, []);

  const handleDeleteTransaction = useCallback((index: number) => {
    setTransactions((prevTransactions) => prevTransactions.filter((_, idx) => idx !== index));
  }, []);

  const isTitleValid = proposalTitle?.length > 5;

  return (
    <Container maxW="container.lg" px={{ base: "0", md: "20%" }}>
      <form onSubmit={handleSubmit(() => { })}>
        <StepsRoot defaultStep={0} count={3} step={currentStep} onStepChange={(details) => setCurrentStep(details.step)}>
          <StepsList>
            <StepsItem index={0} icon={<LuFileText />} />
            <StepsItem index={1} icon={<LuPlus />} />
            <StepsItem index={2} icon={<LuCheckCircle />} />
          </StepsList>

          {/* Step 1: Proposal Title */}
          <StepsContent index={0}>
            <VStack gap={4} align='stretch' p={4}>
              <Text fontSize='2xl' fontWeight='bold'>
                Proposal Title
              </Text>
              <Controller
                name='proposalTitle'
                control={control}
                defaultValue=''
                rules={{
                  required: 'Title is required',
                  minLength: {
                    value: 6,
                    message: 'Title must be longer than 5 characters',
                  },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input placeholder='Enter your proposal title' {...field} />
                    {fieldState.error && (
                      <Text color='red.500'>{fieldState.error.message}</Text>
                    )}
                  </>
                )}
              />
            </VStack>
          </StepsContent>

          {/* Step 2: Add Transactions */}
          <StepsContent index={1}>
            <VStack gap={4} align='stretch' p={4}>
              <Text fontSize='2xl' fontWeight='bold'>
                Transactions
              </Text>

              {currentTransactionType ? (
                <TransactionItem
                  type={currentTransactionType}
                  onAdd={handleAddTransactionDetails}
                  onCancel={handleCancelTransaction}
                />
              ) : showTransactionOptions ? (
                <TransactionTypes onSelect={handleSelectTransaction} />
              ) : (
                <>
                  <TransactionList
                    transactions={transactions}
                    onDelete={handleDeleteTransaction}
                  />
                  <Button colorScheme='teal' onClick={handleAddTransaction}>
                    Add Transaction
                  </Button>
                </>
              )}
            </VStack>
          </StepsContent>

          {/* Step 3: Proposal Description */}
          <StepsContent index={2}>
            <VStack gap={4} align='stretch' p={4}>
              <Text fontSize='2xl' fontWeight='bold'>
                Proposal Description
              </Text>
              <Controller
                name='editorContent'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <Editor
                    value={field.value} // Pass the form value to the editor
                    onChange={(content) => {
                      field.onChange(content); // Update react-hook-form state
                    }}
                  />
                )}
              />
            </VStack>
          </StepsContent>

          {/* Review and Submit */}
          <StepsCompletedContent>
            <VStack gap={4} align="stretch" p={4}>
              <Text fontSize="2xl" fontWeight="bold">Review and Submit</Text>
              <Text>Title: <strong>{proposalTitle}</strong></Text>
              <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
              <Box
                borderWidth="1px"
                borderRadius="md"
                borderColor={editorContent ? "gray.300" : "red.500"}
                p={4}
              >
                <Markdown text={editorContent} />
              </Box>
              <SubmitProposalButton
                isTitleValid={isTitleValid}
                transactions={transactions}
                proposalTitle={proposalTitle}
                editorContent={editorContent}
              />
            </VStack>
          </StepsCompletedContent>

          {/* Navigation Buttons */}
          <Group mt={6} justify="space-between">
            <StepsPrevTrigger asChild>
              <div>
                <Button variant="outline" size="sm">
                  Previous
                </Button>
              </div>
            </StepsPrevTrigger>
            <StepsNextTrigger asChild>
              <div>
                {currentStep < 3 && (
                  <Button
                    variant="solid"
                    size="sm"
                    colorScheme="teal"
                    disabled={!isTitleValid && !transactions.length}
                  >
                    Next
                  </Button>
                )}
              </div>
            </StepsNextTrigger>
          </Group>
        </StepsRoot>
      </form>
    </Container>
  );
};

export default CreateProposalPage;
