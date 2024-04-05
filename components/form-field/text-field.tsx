import React from 'react';
import {TextInput, Text, View} from 'react-native';

interface TextFormProps {
  name: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  onBlur: () => void;
  value: string;
  errors: string[];
}

const TextField = ({
  name,
  placeholder,
  onChangeText,
  onBlur,
  value,
  errors,
}: TextFormProps) => {
  return (
    <View className="py-6">
      <TextInput
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="rounded-xl bg-[#191919] text-white border border-white px-6 py-3"
      />
      {errors &&
        errors.map((error, index) => (
          <Text key={index} className="text-white mt-3 ml-3">
            {error}
          </Text>
        ))}
    </View>
  );
};

export default TextField;
