/**
 * Created by dongwei on 2017/4/11.
 */
import React from 'react';
import style from '../styles/auto-complete.less';

function getItemValue(item){
    return item.value||item;
}

class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            displayValue:'',
            activeItemIndex:-1
        };

    }
    
    //在用户输入/选择列表项的时候重置内部状态(清空displayName, 设置activeItemIndex为-1)
    //通过回调将新的值传递给组件使用者
    handleChange(value){
        this.setState({
            activeItemIndex:-1,
            displayValue:''
        });
        this.props.onValueChange(value);
    }

    // 判断当前按下的键是否为上下方向键或回车键,
    //    如果是上下方向键则根据方向设置当前被选中的列表项
    // 如果是回车键并且当前有选中状态的列表项,则调用hanleChange
    handleKeyDown(e){
        const {activeItemIndex} = this.state;
        const {options}= this.props;
        switch(e.keyCode){
            //13为回车键的键码(keyCode)
            case 13:{
                if(activeItemIndex >= 0){
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleChange(getItemValue(options[activeItemIndex]));
                }
                break;
            }
            // 38为上方向键,40为下方向键
            case 38:
            case 40:
                e.preventDefault();
                this.moveItem(e.keyCode===38?'up':'down');
                break;
        }
    }

    moveItem(direction){
        const {activeItemIndex} = this.state;
        const {options} = this.props;
        
    }

    handleEnter(index){

    }

    handleLeave(){

    }


    render(){
        const {displayValue, activeItemIndex} = this.state;
        const {value, options} = this.props;
        return(
            <div className={style.wrapper}>
                <input value={displayValue||value}
                    onChange={e=>this.handleChange(e.target.value)}
                    onKeyDown={this.handleKeyDown}
                />
                {
                    options.length>0 &&(
                        <ul className={style.options}>
                        {
                            options.map((item,index)=>{
                                return(
                                    <li key={index} 
                                        className={activeItemIndex===index?style.active:''}
                                        onMouseEnter={()=>this.handleEnter(index)}
                                        onClick={()=>this.handleChange(getItemValue(item))}
                                    >
                                        {item.text||item}
                                    </li>
                                );
                            })
                        }
                        </ul>
                    )
                }
            </div>
        )
    }
}

//通用组件最好写一下propTypes约束
AutoComplete.propTypes = {
    value: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    onValueChange: React.PropTypes.func.isRequired
};

export default AutoComplete;