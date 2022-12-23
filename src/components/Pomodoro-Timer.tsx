import React from 'react';
import { useInterval } from "../hooks/use-interval";
// import { secondsToTime } from '../utils/secontsToTime';
import { Button } from './Button';
import { Timer } from './Timer';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime)

  useInterval(() => {
    setMainTime(mainTime - 1)
  }, 1000)
  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <Button text="teste" onClick={() => console.log('click')}></Button>
    </div>
  )
}
