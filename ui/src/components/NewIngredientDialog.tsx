import { Dialog } from "@mui/material";
import { useState } from "react";

interface NewIngredientDialogProps {
    isOpen: boolean
    onClose: () => void
    onSave: (name: string, description: string) => void
}

const NewIngredientDialog = (props: NewIngredientDialogProps) => {
    const { isOpen, onClose, onSave } = props;
    const [newIngredientName, setNewIngredientName] = useState('')
    const [newIngredientDescription, setNewIngredientDescription] = useState('')

    console.log('NewIngredientDialog', newIngredientName, newIngredientDescription)

    const handleSave = () => {
        onSave(newIngredientName, newIngredientDescription)
        setNewIngredientName('')
        setNewIngredientDescription('')
        onClose()
    }
    const handleClose = () => {
        setNewIngredientName('')
        setNewIngredientDescription('')
        onClose()
    }
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <div>
                <h2>New Ingredient</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newIngredientName}
                    onChange={(e) => setNewIngredientName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newIngredientDescription}
                    onChange={(e) => setNewIngredientDescription(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleClose}>Cancel</button>
            </div>
        </Dialog>
    )

}

export default NewIngredientDialog