// src/components/SubjectDropdown.js
import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function SubjectDropdown({ value, onChange, index, availableSubjects }) {
  const handleChange = (e) => {
    onChange(index, 'name', e.target.value); // Update subject name when selected
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id={`subject-label-${index}`}>Subject</InputLabel>
      <Select
        labelId={`subject-label-${index}`}
        value={value}
        onChange={handleChange}
        label="Subject"
      >
        {availableSubjects.map((subject, idx) => (
          <MenuItem key={idx} value={subject}>
            {subject}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SubjectDropdown;
