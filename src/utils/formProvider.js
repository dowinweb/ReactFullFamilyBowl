/**
 * Created by dongwei on 2017/3/19.
 */
import React from 'react';

//fields对象的结构:
/*
const fields ={
    name:{
        defaultValue:'',
        rules:[{
            pattern:function(value){
                return value.length>0
            },
            error:'请输入用户名'
        },
        {
            pattern:/^.{1,4}$/,
            error:'用户名最多4个字符'
        }]
    },
    age:{...},
    gender:{...}
}
*/


function formProvider(fields) {
    return function (Comp){
        const initialFormState = {};
        for(const key in fields){
            // 只取fields中name,age,gender下的value和error字段
            initialFormState[key]={
                value:fields[key].defaultValue,
                error:''
            };
        }
        
        class FormComponent extends React.Component {
            constructor(props){
                super(props);
                this.state={
                    form:initialFormState,
                    formValid:false
                };
                // 为什么要bind this呢? 为了在传入组件后找到该方法,因为方法写在这里,this调用时在传入后的组件中的this不是此this
                this.handleValueChange = this.handleValueChange.bind(this);
                this.setFormValues = this.setFormValues.bind(this);
            }
            // 更新表单数据
            setFormValues(values){
                if(!values){
                    return;
                }
                const {form} = this.state;
                console.log('form: ',form);
                let newForm = {...form};
                for(const field in form){
                    if(form.hasOwnProperty(field)){
                        if(typeof values[field]!=='undefined'){
                            newForm[field]={...newForm[field],value:values[field]};
                        }
                    //    正常情况下,主动设置的每个字段一定是有效的.废话因为从数据库取来的
                        newForm[field].valid = true;
                    }
                }
                //更改了state的内容,就会在表单中显示出来
                this.setState({form:newForm});
            }
            handleValueChange(fieldName,value){
                // 字段名, 值
                console.log(fieldName,value);
                const {form} = this.state;
                // value =>新的value值;
                const newFieldState = {
                    value,
                    valid:true,
                    error:''
                };
                const fieldRules = fields[fieldName].rules;
                for(let i=0;i<fieldRules.length;i++){
                    const {pattern,error}=fieldRules[i];
                    let valid = false;
                    if(typeof pattern === 'function'){
                        valid = pattern(value);
                    } else {
                        valid = pattern.test(value);
                    }
                    
                    if(!valid){
                        newFieldState.valid = false;
                        newFieldState.error = error;
                        break;
                    }
                }
                // value覆盖value,error覆盖error, valid新增valid
                const newForm = {...form, [fieldName]:newFieldState};
                const formValid = Object.values(newForm).every(f=>f.valid);

                this.setState({
                    form: newForm,
                    formValid
                })
            }

            render(){
                const {form,formValid} = this.state;
                return <Comp {...this.props} 
                    form={form} 
                    formValid={formValid} 
                    onFormChange={this.handleValueChange}
                    setFormValues={this.setFormValues}
                />
            }
            
        }
        return FormComponent;
    }
}

export default formProvider;
