import React, { useState } from 'react';
import './PasswordGenerator.css';

function PasswordGenerator() {
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const generatePassword = () => {
        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        
        if (charset === '') {
            setError('Please select at least one character type.');
            return;
        }

        setError('');
        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            generatedPassword += charset[randomIndex];
        }

        setPassword(generatedPassword);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        alert('Password copied to clipboard!');
    };

    return (
        <div className="password-generator">
            <h1>Password Generator</h1>
            <div className="settings">
                <label>Password Length:
                    <input type="number" value={length} onChange={(e) => setLength(e.target.value)} style={{padding:'5px', borderRadius:'5px',border:'none'}} />
                </label>
                <label>
                    <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
                    Include Uppercase Letters
                </label>
                <label>
                    <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />
                    Include Lowercase Letters
                </label>
                <label>
                    <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
                    Include Numbers
                </label>
                <label>
                    <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
                    Include Symbols
                </label>
                {error && <p className="error">{error}</p>}
            </div>
            <button onClick={generatePassword} style={{padding:'10px',color:'black',borderRadius:'5px', border:'none', cursor:'pointer',backgroundColor:'gray'}}>Generate Password</button>
            <div className="output">
                <input type="text" value={password} readOnly style={{padding:'5px', borderRadius:'5px',border:'none'}}/>
                <button onClick={copyToClipboard} style={{padding:'10px',color:'black',borderRadius:'5px', border:'none', cursor:'pointer',backgroundColor:'blue', fontWeight:'500'}}>Copy to Clipboard</button>
            </div>
        </div>
    );
}

export default PasswordGenerator;
