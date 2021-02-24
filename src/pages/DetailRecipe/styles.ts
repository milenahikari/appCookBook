import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  background: #c72828;
  padding: 65px 24px 65px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const WrapperBack = styled.TouchableOpacity``;

export const WrapperFavourite = styled.TouchableOpacity``;

export const IconFilled = styled.Image`
  width: 26px;
  height: 26px;
`;

export const Title = styled.Text`
  font-family: 'Poppins-Regular';
  color: #fff;
  font-size: 20px;
`;

export const RecipeData = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: -8%;
  margin-bottom: 25px;
`;

export const ImageRecipe = styled.Image`
  width: 100%;
  height: 250px;
  border-radius: 10px;
`;

export const NameRecipe = styled.Text`
  font-family: 'Poppins-Regular';
  color: #ffb84d;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
`;

export const Section = styled.View`
  margin-bottom: 25px;
`;

export const SectionTitle = styled.Text`
  font-family: 'Poppins-Regular';
  color: #6c6c80;
  font-size: 25px;
  margin-top: 15px;
  margin-bottom: 15px;
  line-height: 40px;
`;

export const SectionTextDetail = styled.Text`
  font-family: 'Poppins-Regular';
  color: #6c6c80;
  font-size: 18px;
  line-height: 40px;
`;
