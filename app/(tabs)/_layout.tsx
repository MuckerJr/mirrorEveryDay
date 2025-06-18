import { IconSymbol } from "@/app-example/components/ui/IconSymbol.ios";
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue'}}>
            <Tabs.Screen
                name="gallery"
                options={{
                    title: 'Gallery',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="photo.on.rectangle.angled" color={color}/>
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Camera',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="person.crop.circle.dashed" color={color}/>
                }}
            />
        </Tabs>
    )
}