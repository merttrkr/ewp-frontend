import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import SelectAutoComplete from '@/components/form-components/SelectAutoComplete';
import TextInput from '@/components/form-components/TextInput';
import DatePickerInput from '@/components/form-components/DatePickerInput';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { log } from 'console';

type RegisterInput = {
  IIAcode: String;
  IIAID: String;
};

type InstitutionInformationFormProps = {
  pageName: String;
  subText: String;
};

export default function DisplayAgreements({
  pageName,
  subText,
}: InstitutionInformationFormProps) {
  const methods = useForm<RegisterInput>();

  const {
    
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful ,isSubmitting},
  } = methods;
  const testUser = async (data: RegisterInput) => {
    console.log(data);
    
    console.log(data.IIAcode);
    
  }
  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    console.log(values.IIAcode);
    
    testUser(values);
  };

  return (
    <Stack>
      <FormProvider {...methods}>
        <Box
          onSubmit={handleSubmit(onSubmitHandler)}
          as={'form'}
          mt={10}
          boxShadow={'lg'}
          padding={5}
          borderRadius={'xl'}
        >
          <Flex>
            <Stack w='50%' spacing={4} p='5'>
              <SelectAutoComplete selectLabel='Kurum / Üniversite Adı' />
              <TextInput

                label='İkili Anlaşma Kodu (IIA-Kodu)' name='IIAcode'
              />
            </Stack>
            <Stack w='50%' spacing={4} p='5'>
              <SelectAutoComplete selectLabel='Departman / Bölüm Adı' />
              <TextInput
                label='İkili Anlaşma IDsi (IIA-ID)' name='IIAID'
              />
            </Stack>
          </Flex>
          <Flex gap={3} justifyContent={'right'} pr={4}>
            <Button variant='submit' isLoading={isSubmitting} type='submit'>
              Kaydet
            </Button>
            <Button variant='clear'>Temizle</Button>
          </Flex>
        </Box>
      </FormProvider>
    </Stack>
  );
}
