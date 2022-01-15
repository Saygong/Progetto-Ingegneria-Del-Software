
import React from "react";

class Tabs extends React.Component{
    state ={
        activeTab: this.props.children[0].props.label
    }
    changeTab = (tab) => {
        this.setState({ activeTab: tab });
    };
    render(){
        let content;
        let buttons = [];
        return (
            <div>
                {React.Children.map(this.props.children, child =>{
                    buttons.push(child.props.label)
                    if (child.props.label === this.state.activeTab) content = child.props.children
                })}

                <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab}/>
                <div className="tab-content">{content}</div>
            </div>
        );
    }
}

const TabButtons = ({buttons, changeTab, activeTab}) =>{
    return(
        <div className="family-m-tab-buttons">
            {buttons.map((button, index) =>{
                return <button key={index} className={button === activeTab? 'family-m-active': 'family-m-button'} onClick={()=>changeTab(button)}>{button}</button>
            })}
            <hr/>
        </div>
    )
}

export default Tabs;
