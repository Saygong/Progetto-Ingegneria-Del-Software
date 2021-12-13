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
        <div className="familyMtab-buttons">
            {buttons.map(button =>{
                return <button className={button === activeTab? 'familyMactive': 'familyMbutton'} onClick={()=>changeTab(button)}>{button}</button>
            })}
            <hr/>
        </div>
    )
}

//TODO a che serve lol, l'esempio lo usava perche fa <Tab> ma io riesco a importare lo stesso anche se lo commento kekw
// const Tab = props =>{
//     return(
//         <React.Fragment>
//             {props.children}
//         </React.Fragment>
//     )
// }

export default Tabs;