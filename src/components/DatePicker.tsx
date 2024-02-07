// import React from 'react';
// import { StyleSheet,Text, View, Button, Platform } from 'react-native';
// import DatePicker from 'react-native-datepicker';

// interface MyDatePickerProps {
//   date: string;
//   onDateChange: (date: string) => void;
//   onPressCancel: () => void;
// }

// const MyDatePickerWrapper: React.FC<MyDatePickerProps> = ({
//   date,
//   onDateChange,
//   onPressCancel,
// }) => (
//   <>
//     <DatePicker
//       style={styles.datePicker}
//       date={date}
//       mode="date"
//       placeholder="Select Birthdate"
//       format="YYYY-MM-DD"
//       confirmBtnText="Confirm"
//       cancelBtnText="Cancel"
//       onDateChange={onDateChange}
//     />
//   </>
// );

// const styles = StyleSheet.create({
//   datePicker: {
//     width: '80%',
//     marginBottom: 16,
//     borderRadius: 8,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     paddingHorizontal: 16,
//   },
// });

// export default MyDatePickerWrapper;
