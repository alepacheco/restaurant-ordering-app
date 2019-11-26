import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TextInput } from 'components/Forms/TextInput';
import { Button, View, Text } from 'react-native';

const StyledView = styled.SafeAreaView`
  height: 100%;
  ${props => `background-color: ${props.theme.color};`}
`;

const InputForm = styled.View`
  margin: 24px 8px;
`;

const Container = styled.View`
  margin-top: 200px;
`;

const TroubleText = styled.Text`
  text-align: center;
  margin-top: 38px;
  font-size: 34px;
  ${props => `color: ${props.theme.textColor};`}
`;

const PasswordText = styled.Text`
  text-align: center;
  margin-top: 20px;
  ${props => `color: ${props.theme.textColor};`}
`;

export const ForgotPass: React.FC<{}> = ({}) => {
  const [username, setUsername] = useState('');

  return (
    <StyledView>
      <Container>
        <TroubleText>Trouble loggin in&#63;</TroubleText>
        <PasswordText>
          Enter your username and we&#39;ll send you a link to get back into
          your account.
        </PasswordText>
        <InputForm>
          <TextInput
            placeholder="Username"
            onChangeText={text => setUsername(text)}
            value={username}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            blurOnSubmit
          />
        </InputForm>

        <View>
          <Button title="Send email" onPress={() => 'none'} />
        </View>
      </Container>
    </StyledView>
  );
};
