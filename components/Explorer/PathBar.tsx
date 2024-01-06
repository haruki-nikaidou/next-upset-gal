import styles from './PathBar.module.css';

interface PathBarProps {
    path: string[];
    onClick: (index: number) => void;
}

export default function PathBar(props: PathBarProps) {
    return (
        <div className={styles.pathBar}>
            <span>
                {'<'}
            </span>
            {
                props.path.map((path, index) => {
                    return (
                        <span key={index}
                              onClick={() => props.onClick(index)}
                        >
                            {path}
                        </span>
                    )
                })
            }
        </div>
    )
}