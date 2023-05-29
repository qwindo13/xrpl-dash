import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button/Button';

function TagInput({ options, placeholder }) {
    const [tags, setTags] = useState([]);
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        if (e.target.value.length > 0) {
            const newSuggestions = options.filter((option) =>
                option.name.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
                option.symbol.toLowerCase().startsWith(e.target.value.toLowerCase())
            );
            setSuggestions(newSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && input) {
            const selectedToken = options.find(option => option.name === input || option.symbol === input);
            if (selectedToken && !tags.find(tag => tag.symbol === selectedToken.symbol)) {
                setTags([...tags, selectedToken]);
                setInput('');
                setSuggestions([]);
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        if (!tags.find(tag => tag.symbol === suggestion.symbol)) {
            setTags([...tags, suggestion]);
            setInput('');
            setSuggestions([]);
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag.symbol !== tagToRemove.symbol));
    };

    return (
        <div className="flex flex-col w-full h-auto">
           <div className="border w-full min-h-full h-40 border-white border-opacity-5 p-4 rounded-2xl flex flex-row flex-wrap items-start transition-all duration-300">

                {tags.map((tag, index) => (
                    <div key={index} className="bg-[#A6B0CF] bg-opacity-20 text-white p-2 rounded-xl mr-4 mb-4 items-center font-semibold text-sm flex flex-row gap-2">
                        <span className='whitespace-nowrap font-semibold text-sm'>{tag.symbol} ({tag.name})</span>
                        <Button onClick={() => handleRemoveTag(tag)} disableAnimation className="bg-transparent !p-0 !px-0 text-xs">x</Button>
                    </div>
                ))}
                <div className="relative">
                    <input
                        type="text"
                        className="flex-grow h-full block w-full bg-transparent border-none focus:border-none "
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        placeholder={placeholder}
                    />
                    {suggestions.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute flex flex-col gap-2 bg-[#111015] bg-opacity-60  mt-2 border border-[#fff] border-opacity-10 rounded-2xl z-10 backdrop-blur	"
                        >
                            {suggestions.map((suggestion, index) => (
                                <div key={index} onClick={() => handleSuggestionClick(suggestion)} className="w-max cursor-pointer p-4 flex flex-row items-center gap-2">
                                    <img src={suggestion.image} alt={suggestion.symbol} width="20" height="20" className="rounded-full" />
                                    <span className='whitespace-nowrap font-semibold text-sm'>{suggestion.symbol} ({suggestion.name})</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TagInput;
