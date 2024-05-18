import {createNativeStackNavigator} from '@react-navigation/native-stack'
import welcome from '../app/Login/welcome'
import signIn from '../app/Login/SignIn'

const Stack = createNativeStackNavigator();

const Routes = () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "welcome"
                component={welcome}
            />
            <Stack.Screen
                 name = "signIn"
                 component={signIn}
            />
        </Stack.Navigator>
        
    );
}

export default Routes;