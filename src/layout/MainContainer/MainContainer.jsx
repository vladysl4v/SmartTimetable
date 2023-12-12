import './MainContainer.css'

export const MainContainer = ({children, classList = "", ...props}) => {
    return (
          <div className={'main-container ' + classList} {...props}>
            {children}
        </div>
    )
}