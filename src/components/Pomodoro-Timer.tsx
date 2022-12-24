import React, { useState, useEffect } from 'react';
import { useInterval } from "../hooks/use-interval";
import { Button } from './Button';
import { Timer } from './Timer';

import bellStart from '../sounds/src_sounds_bell-start.mp3';
import bellFinish from '../sounds/src_sounds_bell-finish.mp3';
import { secondsToTime } from '../utils/secondsToTime';

const audioStartWorking = new Audio(bellStart)
const audioStopWorking = new Audio(bellFinish)

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime)
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQntManager, setCyclesQntManager] = useState(new Array(props.cycles -1).fill(true));

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);


  const handleWork = () => {
    setTimeCounting(true)
    setWorking(true)
    setResting(false)
    setMainTime(props.pomodoroTime)
    audioStartWorking.play();
  }

  const handleRest = (Long: boolean) => {
    setTimeCounting(true)
    setWorking(false)
    setResting(true)

    if (Long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }
    audioStopWorking.play();
  }


  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesQntManager.length > 0) {
      handleRest(false);
      cyclesQntManager.pop();
    } else if (working && cyclesQntManager.length <= 0) {
      handleRest(true);
      setCyclesQntManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1)
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) handleWork();

  }, [working,
    resting,
    mainTime,
    cyclesQntManager,
    numberOfPomodoros,
    handleRest,
    setCyclesQntManager,
    handleWork,
    props.cycles,
  ])



  useInterval(() => {
    setMainTime(mainTime - 1)
    if (working) setFullWorkingTime(fullWorkingTime +1)
  }, timeCounting ? 1000 : null);




  return (
    <div className="pomodoro">
      <h2>It's { working ? 'working' : 'resting' } time </h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
      <Button text="Iniciar" onClick={() => handleWork()}></Button>
      <Button text="Rest" onClick={() => handleRest(false)}></Button>
        <Button
        text={timeCounting ? "Pause" : "Play"}
        className={!working && !resting ? "hidden" : ""}
        onClick={() => setTimeCounting(!timeCounting)}></Button>
      </div>
      <div className="details">
        <p>Ciclos Concluídos: {completedCycles}</p>
        <p>Horas de Trabalho: { secondsToTime(fullWorkingTime) }</p>
        <p>Pomodoro concluídos: {numberOfPomodoros} </p>
      </div>
    </div>
  )
}
