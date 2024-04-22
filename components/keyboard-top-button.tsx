import { Text, KeyboardAvoidingView, Dimensions } from 'react-native';
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { useFormContext } from 'houseform';
import { SignupFormList } from '@/const';
import { AnimatedPressable } from './ui/animate-pressable';

interface KeyboardTopbuttonProps {
  show?: boolean;
  step: number;
  setStep(index: number): void;
}

const KeyboardTopButton = forwardRef<
  { handlePress: () => void },
  KeyboardTopbuttonProps
>(({ show, step, setStep }, ref) => {
  const { getFieldValue, submit } = useFormContext();
  const handlePress = useCallback(() => {
    const currentTarget = getFieldValue(SignupFormList[step].name);
    if (currentTarget) {
      if (currentTarget.isValid) {
        if (step >= SignupFormList.length) {
          submit();
        } else {
          setStep(SignupFormList[step].id);
        }
      }
    }
  }, [getFieldValue, setStep, step, submit]);

  useImperativeHandle(
    ref,
    () => {
      return {
        handlePress,
      };
    },
    [handlePress],
  );

  return show ? (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        width: Dimensions.get('window').width,
      }}>
      <AnimatedPressable className="py-3" onPress={handlePress}>
        <Text className="text-center font-bold bg-white py-3 text-black">
          {step === 5 ? '인증번호 요청' : '확인'}
        </Text>
      </AnimatedPressable>
    </KeyboardAvoidingView>
  ) : null;
});

export default KeyboardTopButton;
