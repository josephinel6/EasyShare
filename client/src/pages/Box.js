export default function Box({ box }) {

    console.log(box);

    return (
        <div>
            <h1> {box.name}</h1>
            {box.shares && box.shares.map((share) =>
                <div> {share} </div>
            )}
        </div>
    )
}