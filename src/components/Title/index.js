import "./title.css"

export default function Title({ name }) {
    return (
        <div className="title-border">
            <div className="title">
                <span>{ name }</span>
            </div>
        </div>
    )
}
