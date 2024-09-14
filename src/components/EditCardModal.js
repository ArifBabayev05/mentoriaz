import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    Textarea,
    NumberInput,
    NumberInputField,
    Button
} from '@chakra-ui/react';

const EditCardModal = ({ isOpen, onClose, card, onSave }) => {
    const [editedCard, setEditedCard] = useState(card);

    useEffect(() => {
        setEditedCard(card);
    }, [card]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCard((prevCard) => ({ ...prevCard, [name]: value }));
    };

    const handleNumberInputChange = (valueAsString) => {
        setEditedCard((prevCard) => ({ ...prevCard, price: valueAsString }));
    };

    const handleSave = () => {
        onSave(editedCard);
        onClose();
    };
    useEffect(() => {
        setEditedCard(card); // Update local state if card prop changes
    }, [card]);

    return (
        <>
        <ModalOverlay/>

            <ModalContent  bg="white">
                <ModalHeader>Edit Card</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input
                        placeholder="Name"
                        name="name"
                        value={editedCard.name}
                        onChange={handleInputChange}
                        mb={3}
                    />
                    <Textarea
                        placeholder="Description"
                        name="description"
                        value={editedCard.description}
                        onChange={handleInputChange}
                        mb={3}
                    />
                    <NumberInput
                        value={editedCard.price}
                        onChange={handleNumberInputChange}
                        mb={3}
                    >
                        <NumberInputField placeholder="Price" />
                    </NumberInput>
                    <Input
                        placeholder="Time"
                        name="time"
                        value={editedCard.time}
                        onChange={handleInputChange}
                        mb={3}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={handleSave}>
                        Save Changes
                    </Button>
                </ModalFooter>
            </ModalContent>
            </>
    );
};

export default EditCardModal;
