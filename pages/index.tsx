import { RadioGroup, Switch } from '@headlessui/react';
import type {NextPage} from 'next'
import {useEffect, useState} from "react";

const colors = ['green', 'red', 'blue'];
const modes = ['light', 'dark'];

function useStickyState(defaultValue: string | undefined, key: string): [string | undefined, (v: string) => void] {
    const [value, setValue] = useState<string | undefined>(defaultValue);

    useEffect(() => {
        const stickyValue = localStorage.getItem(key)
        if (stickyValue !== null) {
            setValue(stickyValue)
        }
    }, [key, setValue])

    return [value, (v) => {
        localStorage.setItem(key, v)
        setValue(v)
    }]
}

const Home: NextPage = () => {
    const [color, setColor] = useStickyState(colors[0], 'theme-color')
    const [mode, setMode] = useStickyState(modes[0], 'theme-mode')

    return (
        <div className={[
            'font-mono bg-primaryBg h-screen flex flex-col justify-center',
            color && `theme-${color}`,
            mode && `theme-${mode}`,
        ].filter(Boolean).join(' ')}>
            <div className="mx-auto bg-neutralBg text-onNeutralBg border-8 border-onNeutralBg p-5 max-w-lg">
                <h1 className="text-3xl font-bold text-center">
                    Tailwind Themes
                </h1>

                <RadioGroup value={color} onChange={setColor}>
                    <RadioGroup.Label className="block mt-5">Select a color:</RadioGroup.Label>
                    <div className="flex justify-between space-x-8 mt-2">
                        {colors.map(c => {
                            return <RadioGroup.Option
                                className="ui-checked:text-onPrimaryBg ui-checked:bg-primaryBg ring-4 ui-checked:ring-primary ui-not-checked:ring-onNeutralBg h-20 w-full flex justify-center items-center font-bold uppercase cursor-pointer"
                                value={c} key={c}>{c}</RadioGroup.Option>
                        })}
                    </div>
                </RadioGroup>

                <Switch.Group>
                    <div className="mt-10">
                        <Switch.Label className="block">Enable dark mode:</Switch.Label>
                        <Switch
                            className="bg-onNeutralBg h-6 w-11 rounded-full relative inline-flex items-center"
                            checked={mode === 'dark'} onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}>
                            <span className="h-4 w-4 bg-neutralBg rounded-full inline-block transform transition ui-not-checked:translate-x-1 ui-checked:translate-x-6" />
                        </Switch>
                    </div>
                </Switch.Group>
            </div>

        </div>

    )
}

export default Home
