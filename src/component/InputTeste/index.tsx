import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { Container, MyTextInput } from './styles';

const InputTeste: React.FC = ({ handleAddText }) => {
  const [value, setValue] = useState('');

  return (
    // <View />
    <Container>
      <Text>{value}</Text>
      <MyTextInput
        onChangeText={setValue}
        onBlur={() => handleAddText(value)}
        value={value}
      />
    </Container>
  );
};

export default InputTeste;
