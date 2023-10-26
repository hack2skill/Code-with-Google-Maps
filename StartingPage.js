import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const StartingPage = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [name, setName] = useState('Nainvi Singh');
  const [place, setPlace] = useState('IIIT Bhagalpur, Sabour');
  const [offenderCount, setOffenderCount] = useState('');
  const [harassmentDetail, setHarassmentDetail] = useState('');
  const [otherDetail, setOtherDetail] = useState('');
  const [emergencyImageVisible, setEmergencyImageVisible] = useState(false);

  const handleEmergency = () => {
    // Implement the logic for emergency alert
    console.log('Emergency button pressed!');
    setEmergencyImageVisible(true);
  };

  const handleSpecifySituation = () => {
    // Open the form
    setFormVisible(true);
  };

  const handleFormSubmit = () => {
    // Implement logic to handle form submission
    console.log('Form submitted with data:', name, place, offenderCount, harassmentDetail, otherDetail);
    // Close the form modal
    setFormVisible(false);
  };

  const closeForm = () => {
    // Close the form modal
    setFormVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Emergency Button */}
      <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergency}>
        <Text style={styles.buttonText}>Emergency</Text>
      </TouchableOpacity>

      {/* Specify Situation Button */}
      <TouchableOpacity style={styles.situationButton} onPress={handleSpecifySituation}>
        <Text style={styles.buttonText}>Specify Situation</Text>
      </TouchableOpacity>

      {/* Render Emergency Image */}
      {emergencyImageVisible && (
        <Image
          source={{ uri: 'https://storage.googleapis.com/support-forums-api/attachment/thread-178896989-17958146103672935931.jpg' }}
          style={{ width: '100%', height: '100%' }}
        />
      )}

      {/* Form Modal */}
      <Modal visible={isFormVisible} animationType="slide">
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Situation Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            editable={false} // Make it non-editable
          />
          <TextInput
            style={styles.input}
            placeholder="Place"
            value={place}
            onChangeText={(text) => setPlace(text)}
            editable={false} // Make it non-editable
          />
          <TextInput
            style={styles.input}
            placeholder="Offender Count"
            keyboardType="numeric"
            value={offenderCount}
            onChangeText={(text) => setOffenderCount(text)}
          />
          {/* Use Dropdown Picker from react-native-dropdown-picker */}
          <DropDownPicker
            items={[
              { label: 'Stalking', value: 'Stalking' },
              { label: 'Verbal Harassment', value: 'Verbal Harassment' },
              { label: 'Sexual Assault', value: 'Sexual Assault' },
            ]}
            placeholder="Select Harassment Detail"
            containerStyle={{ height: 40 }}
            style={styles.input}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={(item) => setHarassmentDetail(item.value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Other Detail"
            value={otherDetail}
            onChangeText={(text) => setOtherDetail(text)}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={closeForm}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  situationButton: {
    backgroundColor: 'blue',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StartingPage;
