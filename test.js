/**
 * Created by dongwei on 2017/3/17.
 * 高阶组件:formProvider模型
 */

function formProvider(fields){
    return function(Comp){
        constructor(props){
            super(props);
            this.state={
                form:{...},
                formValid:false
            };
        }
        handleValueChange(field,value){...}
        class FormComponent extends React.Component {
            render(){
                const {form, formValid} = this.state;
                return (
                    <Comp {...this.props} form={form} formValid={formValid} onFormChange={this.handleValueChange}/>
                )
            }
        }
    }
}
