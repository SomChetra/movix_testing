import { useState } from "react";
import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0); // select
    const [left, setLeft] = useState(0); // position background

    const activeTab = (tab, index) => {
        setLeft(index * 100) // position background left: 0 * 100 = 0, 1 * 100 = 100

        setTimeout(() => {
            setSelectedTab(index)
        }, 300);

        onTabChange(tab, index)
    }

    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem ${selectedTab === index ? 'active' : ''}`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <span className="movingBg" style={{ left }} />
            </div>
        </div>
    )
}

export default SwitchTabs
