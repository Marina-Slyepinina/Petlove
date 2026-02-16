import clsx from "clsx";
import { formatWorkTime } from "../../lib/utils";
import type { WorkDay } from "../../types/friends";
import css from "./WorkingHours.module.css";

interface WorkingHoursProps {
    workDays: WorkDay[];
}

export const WorkingHours = ({ workDays }: WorkingHoursProps) => {

    const { currentWorkTime, details } = formatWorkTime(workDays);

    if (details.length === 0) {
        return (
            <div className={css.container}>
                <div className={css.bage}>
                    <p>{currentWorkTime}</p>
                </div>
            </div>
        )
    }

    return (
        <div className={css.container}>
            <div className={css.bage}>
                <p>{currentWorkTime}</p>
            </div>

            <div className={css.tooltip}>
                <ul className={css.tooltipList}>
                    {details.map((detail, index) => (
                        <li key={index} className={clsx(css.tooltipItem, detail.isToday && css.activeItem)}>
                            <span>{detail.day}: </span>
                            <span>{detail.time}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}