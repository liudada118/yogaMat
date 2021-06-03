import Picker from 'react-native-picker';
export default function UserPicker(data , fn){
    Picker.init({
        pickerData: data,
        pickerConfirmBtnText: '确认',
        pickerCancelBtnText: '取消',
        pickerTitleText: '请选择',
        // selectedValue: [equip],
        onPickerConfirm: data => {
            console.log(data);
            fn(data)
        },
        onPickerCancel: data => {
            console.log(data);
        },
        onPickerSelect: data => {
            console.log(data);
        }
    });
    Picker.show();
}