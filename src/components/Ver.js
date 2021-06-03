import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
 
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

 
const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderBottomWidth: 2,
      borderColor: '#00000030',
      textAlign: 'center',
      color: "#7d53ea"
    },
    focusCell: {
      borderColor: '#7d53ea'
    },
  });
   
  const CELL_COUNT = 6;

export default function Ver() {

     const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

    return (
        <>
                    <View>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { setShowLogin(false) }}>
                            <Iconon name="chevron-back" size={24} color='black' />
                        </TouchableOpacity>
                        <View style={styles.bigContent}>
                            <Text style={styles.bigText}>输入验证码</Text>
                            <Text style={{color : '#999',marginTop : 10}}>86{phoneState}  重新发送</Text>
                        </View>
                        <SafeAreaView style={styles.root}>
                            <CodeField
                                ref={ref}
                                {...Tprops}
                                value={value}
                                onChangeText={setValue}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                renderCell={({ index, symbol, isFocused }) => (
                                    <Text
                                        key={index}
                                        style={[styles.cell, isFocused && styles.focusCell]}
                                        onLayout={getCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />
                        </SafeAreaView>
                    </View>
                    <View style={styles.Tbutton}>   
                        <TouchableOpacity style onPress={() => {
                            pushReg()
                        }}>
                            <Text style={styles.verText}>继续</Text>
                        </TouchableOpacity>
                    </View>
                </>
    )
}
