import { Button, StyleSheet  } from "react-native";

interface StyledButtonProps {
    title: string
    onPress: () => void
    color?: string
}

export default function StyledButton({title, onPress, color}: StyledButtonProps){
    return(
        <Button
            title={title}
            color={color}
            onPress={onPress}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 10,
        marginBottom:20
    }
});