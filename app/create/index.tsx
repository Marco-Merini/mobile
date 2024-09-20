import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native'
import { colors } from '../../constants/colors'
import { Header } from '@/components/header'
import { Input } from '../../components/input'

import { z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import { Select } from '@/components/input/select'
import { useDataStore } from '@/store/data'
import { router } from 'expo-router'

const schema = z.object({
    gender: z.string().min(1, { message: "O sexo é obrigatório!"}),
    objective: z.string().min(1, { message: "O objetivo é obrigatório!"}),
    level: z.string().min(1, { message: "Selecione seu nível!"}),
})

type FormData = z.infer<typeof schema>

export default function Create() {

    const { control, handleSubmit, formState: {errors, isValid }} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const setPageTwo = useDataStore(state => state.setPageTwo)

    const genderOptions = [
        { label: "Masculino", value: "masculino" },
        { label: "Feminino", value: "feminino" }
    ]

    const levelOptions = [
        { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
        { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
        { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
        { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },
      ]
    
      const objectiveOptions = [
        { label: 'Emagrecer', value: 'emagrecer' },
        { label: 'Hipertrofia', value: 'Hipertrofia' },
        { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
        { label: 'Definição', value: 'Definição' },
      ]

      function handleCreate(data: FormData){
        setPageTwo({
          level: data.level,
          gender: data.gender,
          objective: data.objective
        })
    
        router.push("/nutrition")
      }

 return (
   <View style={styles.container}>
    <Header
        step='Passo 2'
        title='Finalizando dieta'
    />

    <ScrollView style={styles.content}>
        <Text style={styles.label}>
            Sexo:
        </Text>
        <Select 
            control={control}
            name="gender"
            placeholder='Selecione o seu sexo'
            error={errors.gender?.message}
            options={genderOptions}
        />

        <Text style={styles.label}>
            Nível de atividade física:
        </Text>
        <Select 
            control={control}
            name="level"
            placeholder='Selecione o seu nível de atividade física'
            error={errors.level?.message}
            options={levelOptions}
        />

        <Text style={styles.label}>
            Objetivo:
        </Text>
        <Select 
            control={control}
            name="objective"
            placeholder='Selecione o seu objetivo'
            error={errors.objective?.message}
            options={objectiveOptions}
        />

        <Pressable 
        style={styles.button} 
        onPress={handleSubmit(handleCreate)}>
            <Text style={styles.buttonText}> Avançar </Text>
        </Pressable>
        
    </ScrollView>

   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background
    },
    label:{
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8
    },
    content:{
        paddingRight: 16,
        paddingLeft: 16,
    },
    buttonText:{
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    button:{
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
})