import styles from './style.module.css';
import React from "react";

export type SelectItem = {
    title: string,
}

type Props = {
    items: SelectItem[],
    selected?: number,
    onChange?: (selected: string) => void,
}

type RatioButtonProps = {
    title: string,
    order: number
}

export default function TabRatio({ items, selected, onChange }: Props) {
    const [selectedItem, setSelectedItem] = React.useState(selected??0);
    const RatioButton = ({ title, order }: RatioButtonProps) => {
        return (
            <button
                className={`${styles.selected} ${order === selectedItem ? styles.selected : ''}`}
                onClick={() => {
                    setSelectedItem(order);
                    onChange?.(title);
                }}>
                {title}
            </button>
        )
    }
    return (
        <div className={styles.buttonContainer}>
            {items.map((item, index) => (
                <RatioButton key={index} title={item.title} order={index} />
            ))}
        </div>
    )
}