import React, { useState } from 'react'
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from '@/assets/styles/register.styles'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '@/constants/color';
import { Link, router } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';
import { MaskedTextInput } from "react-native-mask-text";

export default function SingupScreen() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [Loading, setLoading] = useState(false)
    const [showPassword, setshowPassword] = useState(false)
    const [cedula, setCedula] = useState("");

    const { registrar } = useAuthStore();

    // 🔹 Ejecutar registro y redirigir con delay
    const handlerRegister = async () => {
        setLoading(true)
        console.log(username, email, password);

        if (!username || !email || !password) {
            Alert.alert('Campos incompletos', 'Por favor llena todos los campos.');
            return;
        }
        if (!cedula || !cedulaEsValida(cedula)) {
            Alert.alert("Cédula inválida", "Por favor ingresa una cédula válida.");
            setLoading(false);
            return;
        }

        try {
            await registrar(username, email, password,cedula);
            Alert.alert('Registro exitoso', 'Redirigiendo al login...');

            setTimeout(() => {
                router.replace('/(auth)/login'); // <-- redirige al login
            }, 3000);

        } catch (error: any) {
            Alert.alert('Error en el registro', error.message);
        }
    };

    const cedulaEsValida = (cedula: string): boolean => {
        const arregloCedula = [
            { Key: 'A', Val: 0 }, { Key: 'B', Val: 1 }, { Key: 'C', Val: 2 },
            { Key: 'D', Val: 3 }, { Key: 'E', Val: 4 }, { Key: 'F', Val: 5 },
            { Key: 'G', Val: 6 }, { Key: 'H', Val: 7 }, { Key: 'J', Val: 8 },
            { Key: 'K', Val: 9 }, { Key: 'L', Val: 10 }, { Key: 'M', Val: 11 },
            { Key: 'N', Val: 12 }, { Key: 'P', Val: 13 }, { Key: 'Q', Val: 14 },
            { Key: 'R', Val: 15 }, { Key: 'S', Val: 16 }, { Key: 'T', Val: 17 },
            { Key: 'U', Val: 18 }, { Key: 'V', Val: 19 }, { Key: 'W', Val: 20 },
            { Key: 'X', Val: 21 }, { Key: 'Y', Val: 22 }
        ];

        const numeroCedulaMatch = cedula.match(/\d+/g);
        if (!numeroCedulaMatch) return false;

        const numeroCedula = numeroCedulaMatch.join("");
        const result = Number(numeroCedula) / arregloCedula.length;
        const valorEntero = Math.floor(result);
        const numeroPorLetra = Number(numeroCedula) - (valorEntero * arregloCedula.length);

        const letraMatch = cedula.match(/[a-zA-Z]+/g);
        const letraCedula = letraMatch ? letraMatch.join("").toUpperCase() : "";

        return arregloCedula.some(val => val.Key === letraCedula && val.Val === numeroPorLetra);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <View style={styles.card}>
                    {/* cabecera */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Paciente App</Text>
                        <Text style={styles.subtitle}>Gestion de citas</Text>
                    </View>
                    < View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nombre de usuario</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name='person-outline'
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='ej: user78'
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={username}
                                    onChangeText={setUsername}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                />
                            </View>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Cédula</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="card-outline"
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon}
                                />
                                <MaskedTextInput
                                    mask="999-999999-9999A"
                                    onChangeText={(text, rawText) => setCedula(text)}
                                    value={cedula}
                                    keyboardType="default"
                                    placeholder="ej: 001-120300-0001A"
                                    placeholderTextColor={COLORS.placeholderText}
                                    style={styles.input}
                                />
                            </View>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name='mail-outline'
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='ej:user@gmail.com'
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                />
                            </View>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name='lock-closed-outline'
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='passwors'
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={showPassword}
                                />
                                <TouchableOpacity
                                    onPress={() => setshowPassword(!showPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size={20}
                                        color={COLORS.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={handlerRegister}
                        style={styles.button}
                        disabled={Loading}
                    >
                        {Loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Registrar</Text>
                        )}
                    </TouchableOpacity>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Ya tienes cuenta?</Text>
                        <TouchableOpacity
                            onPress={() => router.back()}
                        >
                            <Text style={styles.link}>Accede a ella

                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
