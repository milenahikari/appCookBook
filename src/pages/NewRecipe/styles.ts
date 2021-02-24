import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  background: #c72828;
  padding: 65px 24px 65px;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Poppins-Regular';
  color: #fff;
  font-size: 20px;
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: -8%;
  margin-bottom: 50px;
`;

export const AddImageWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  background: #f0f0f5;
  justify-content: center;
  align-items: center;
`;

export const ImageRecipe = styled.Image``;

export const SectionTitle = styled.Text`
  font-family: 'Poppins-Regular';
  color: #6c6c80;
  font-size: 23px;
  margin: 20px 0;
`;

export const Section = styled.View``;

export const WrapperLine = styled.View`
  width: 100%;
  height: 45px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 8px;
  align-items: center;
`;

export const Input = styled.TextInput`
  width: 90%;
  background: #f0f0f5;
  color: #9191a9;
  border-radius: 25px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

export const AddText = styled.Text`
  font-family: 'Poppins-Regular';
  color: #6c6c80;
  font-size: 15px;
  margin-left: 10px;
`;

export const RemoveButton = styled.TouchableOpacity``;

export const ButtonSubmitRecipe = styled.TouchableOpacity`
  background: #ffb84d;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
`;

export const ButtonSubmitRecipeText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #c72828;
  flex: 1;
  text-align: center;
  padding: 16px;
`;
