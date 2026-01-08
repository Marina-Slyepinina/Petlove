import { useEffect, useState } from 'react';
import css from './AppLoader.module.css';

interface AppLoaderProps {
    onFinish: () => void;
    isDataLoaded: boolean;
}

export const AppLoader = ({ onFinish, isDataLoaded }: AppLoaderProps) => {
    const [stage, setStage] = useState<'logo' | 'progress'>('logo');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const logoTimer = setTimeout(() => {
            setStage('progress');
        }, 2000);

        return () => clearTimeout(logoTimer);
    }, []);

    useEffect(() => {
        if (stage !== 'progress') return;

        const timer = setInterval(() => {

            setProgress((prev) => {
                if (!isDataLoaded && prev >= 90) {
                    return 90;
                }
                if (isDataLoaded && prev < 100) {
                    return prev + 5;
                }
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onFinish, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 50); 

        return () => clearInterval(timer);
    }, [isDataLoaded, onFinish, stage]);


    return (
        <div className={css.wrapper}>
            {stage === 'logo' && (
                <div className={css.fadeIn}>
                    <svg width={374} height={100}>
                        <use href="/sprite.svg#logo"></use>
                    </svg>
                </div>
            )}

            {stage === 'progress' && (
                <div className={css.progressContainer}>
                    <svg className={css.svgCircle} width="396" height="396">
                        <circle
                            className={css.circleProgress}
                            stroke="rgba(255, 255, 255, 0.2)"
                            strokeWidth="2"
                            cx="198"
                            cy="198"
                            r="198"
                            fill="transparent"
                            strokeDasharray="1234.44" 
                            strokeDashoffset={1234.44 - (1234.44 * progress) / 100}
                        />
                    </svg>
                    
                    <div className={css.percentage}>{Math.min(progress, 100)}%</div>
                </div>
            )}
        </div>
    );
};