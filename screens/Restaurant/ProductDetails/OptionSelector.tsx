import React from 'react';
import styled from 'styled-components/native';
import * as haptics from 'utils/haptics';

const OptionSelectorWrapper = styled.View`
  margin: 24px;
  padding: 8px;
  background-color: ${props => props.theme.contrast2};
  border-radius: 8px;
`;

const Touch = styled.TouchableWithoutFeedback``;

const OptionWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const Title = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 18px;
  margin: 8px;
`;

const TitleSeparator = styled.View`
  background-color: #bbbbbb;
  height: 1px;
  margin: 0 8px;
  border-radius: 1px;
`;

const Description = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 14px;
  margin: auto 0;
`;

const Price = styled.Text`
  color: ${props => props.theme.textColor};
  flex: 1;
  font-size: 14px;
  font-weight: bold;
  text-align: right;
  margin: auto 12px;
`;

const Checkbox = styled.View<{ type: 'single' | 'multi' }>`
  margin: 12px;
  height: 24px;
  width: 24px;
  background-color: #7777bb;
  border-radius: ${({ type }) => (type === 'single' ? '12px' : '6px')};
`;

const CheckboxUnchecked = styled.View<{ type: 'single' | 'multi' }>`
  margin: 12px;
  height: 24px;
  width: 24px;
  background-color: #777777;

  border-radius: ${({ type }) => (type === 'single' ? '12px' : '6px')};
`;

const Option: React.FC<{
  type: 'single' | 'multi';
  checked: boolean;
  onPress: () => void;
  description: string;
  price: string;
}> = ({ checked, onPress, description, price, type }) => {
  return (
    <Touch onPress={onPress}>
      <OptionWrapper>
        {checked ? <Checkbox type={type} /> : <CheckboxUnchecked type={type} />}
        <Description>{description}</Description>
        <Price>+${price}</Price>
      </OptionWrapper>
    </Touch>
  );
};

export const OptionSelector: React.FC<{
  type: 'single' | 'multi';
  name: string;
  choices: Array<{
    _id: string;
    description: string;
    price: string;
  }>;
  updateState: (choices: Array<string>) => void;
  state: Array<string>;
}> = ({ type, name, choices, state, updateState }) => {
  const onPress = (choiceId: string) => {
    haptics.selectionTouch();
    if (type === 'multi') {
      if (state && state.includes(choiceId)) {
        updateState(state.filter(entry => entry !== choiceId));
      } else {
        updateState([...(state || []), choiceId].sort());
      }
    } else if (type === 'single') {
      if (state && state.includes(choiceId)) {
        updateState([]);
      } else {
        updateState([choiceId]);
      }
    }
  };

  return (
    <OptionSelectorWrapper>
      <Title>{name}</Title>
      {choices.map(({ _id, description, price }) => (
        <Option
          key={_id}
          description={description}
          price={price}
          checked={state && state.includes(_id)}
          onPress={() => onPress(_id)}
          type={type}
        />
      ))}
    </OptionSelectorWrapper>
  );
};
