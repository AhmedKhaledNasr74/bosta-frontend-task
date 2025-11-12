import { useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCategories } from "@/contexts/CategoriesContext";

type AddCategoryModalProps = {
    onClose: () => void;
};

const AddCategoryModal = ({ onClose }: AddCategoryModalProps) => {
    const { addCategory } = useCategories();
    const [name, setName] = useState("");
    const [color, setColor] = useState("#7C3AED");

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="bg-background rounded-lg shadow-lg w-full max-w-md p-4">
                <CardTitle className="text-xl mb-2">Add New Category</CardTitle>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                        <Input
                            placeholder="Category name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className=" h-8 flex items-center justify-center p-0 border-0 rounded-md! cursor-pointer overflow-hidden">
                            <Input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-10 h-10 p-0 border-0 rounded-lg! cursor-pointer"
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        aria-label="cancel adding category"
                    >
                        Cancel
                    </Button>
                    <Button
                        aria-label="add category"
                        onClick={() => {
                            if (!name.trim()) return;
                            addCategory(name, color);
                            onClose();
                        }}
                    >
                        Add Category
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default AddCategoryModal;
