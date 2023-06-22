import './PlayerReference.scss';

const PlayerReference = () => {
    return (
        <div className="actions">
            <div className="reference">
                <div className="reference__row">
                    <h3 className="reference__row--label">Action</h3>
                    <h3 className="reference__row--label">Cost</h3>
                </div>
                <div className="reference__row">
                    <h3 className="reference__row--action">Move</h3>
                    <h3 className="reference__row--cost">1 AP</h3>
                </div>
                <div className="reference__row">
                    <h3 className="reference__row--action">Listen</h3>
                    <h3 className="reference__row--cost">1 AP</h3>
                </div>
                <div className="reference__row">
                    <h3 className="reference__row--action">Knife</h3>
                    <h3 className="reference__row--cost">2 AP</h3>
                </div>
                <div className="reference__row">
                    <h3 className="reference__row--action">Shoot</h3>
                    <h3 className="reference__row--cost">2 AP</h3>
                </div>
            </div>
            <div className="skip">
                <button>Skip</button>
            </div>
        </div>
    )
}

export default PlayerReference;