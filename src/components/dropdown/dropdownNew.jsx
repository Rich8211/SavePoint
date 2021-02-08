import React, {useState} from 'react';

const Dropdown = ({title, items, multiselect = false}) => {
    const [open,setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    const toggle = () => setOpen(!open)


    const handleOnClick = (item) => {
        if (!selection.some(current => current.id === item.id)) {
            setSelection([item])
        }
        else {
            let selectionAfterRemoval = selection;
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.id !== item.id
            );
            setSelection([...selectionAfterRemoval])
        }
    }

    return (
        <div className="dd-wrapper">
            <div 
                tabIndex={0} 
                className="dd-header"
                role="button" 
                onKeyPress={() => toggle(!open)}
                onClick={() => toggle(!open)}
                >
                    <div className="dd-header__title">
                        <p className="dd-header__title--bold">{title}</p>
                    </div>
                    <div className="dd-header__action">
                        <p>{open ? 'Close' : 'Open'}</p>
                    </div>

            </div>
                {open && (
                    <ul className="dd-list">
                        {items.map(item => (
                            <li className="dd-list-item" key = {item.id}>
                                <button type="button" onClick={handleOnClick(item)}>
                                    <span>{list.value}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
        </div>
    )
}

export default Dropdown;