import React, { useState } from 'react';
import { Button, Text, View, TextInput, SectionList, Image, StyleSheet, FlatList } from 'react-native';

function App() {
  const [content, setContent] = useState("");
  const [text, setText] = useState('');

  async function getCryptoUSD(word, action) {
    try {
      const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word);
      const json = await response.json();
      if (action === "definition") {
        console.log("Word is: ****** " + word);
        setContent(word + " " + action + ": " + json[0].meanings[0].definitions[0].definition);
      }
      else {
        setContent(word + " " + action + ": " + json[0].meanings[0].definitions[0].synonyms);
      }
    } catch (error) { console.error(error); }
  }

  const logo = {
    uri: 'https://thumbs.dreamstime.com/z/d-dictionary-icon-vector-isolated-white-background-your-web-mobile-app-design-d-dictionary-logo-concept-d-dictionary-134067061.jpg',
    width: 175,
    height: 175,
    
  };

  const styles = StyleSheet.create({ container: { flex: 1, padding: 20, } });

  return (
    <View style={{ flex: 1, paddingLeft: 100, paddingTop:70, paddingRight: 100, justifyContent: "space-evenly" }}>
      <Image source={logo} />
      <SectionList style={{flex:1, paddingTop: 20}}
        sections={[{ title: 'NOTE: \n', data: ['* Try searching for the word "Dictionary"', '* Search will fail if searched for in-correct alphabet'] }]}
        renderItem={({ item }) => <Text>{item}</Text>}
        renderSectionHeader={({ section }) =>
          <Text style={{color: 'blue', fontWeight: 'bold'}}> {section.title}</Text>}
        keyExtractor={(item, index) => index}/>

      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15, marginBottom: 5, marginTop:40}}>  Search: </Text>
      <TextInput
        style={{ height: 40, flex: 0.5}}
        value={text}
        onChangeText={text => setText(text)}
        placeholder="Enter Word to search"
      />

      <Button style={{flex:3, padding: 40}} onPress={() => getCryptoUSD(text, "definition")} title="Fetch Definition" />
      <Button style={{flex:3, padding: 40}} onPress={() => getCryptoUSD(text, "synonyms")} title="Fetch Synonym" />

      <Text style={{flex:3}}>
        {content}
      </Text>
    </View>
  )
}
export default App;