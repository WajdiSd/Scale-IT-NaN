import { Autocomplete, Chip, Container, Link, Stack, TextField, Typography} from "@mui/material";
import { RHFTextField } from "src/components/hook-form";
import useProject from "src/hooks/useProject";
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

export default function AssigneeSeachAutoComplete({handleSetAssignee}) {
const { usersInProject } = useProject();

    return (
        <Autocomplete
            multiple
            id="tags-outlined"
            options={usersInProject}
            getOptionLabel={(option) => option.firstName+" "+option.lastName}
            filterSelectedOptions
            renderInput={(params) => (
            <RHFTextField
                {...params}
                fullWidth
                name="assignees"
                label="Assignees"
                placeholder="Search members"
            />
            )}
            onChange={(event, value) => handleSetAssignee(value)} // prints the selected value

            renderOption={(props, member, { inputValue }) => {
                const { firstName, lastName, _id } = member;
                const suggestionText = `${firstName} ${lastName}`;
        
                let matches = match(suggestionText, inputValue);
                let parts = parse(suggestionText, matches);
                return (
                  <li {...props}>
                    {/*<Image alt={cover} src={cover} sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }} />*/}
                    <Container maxWidth={true}>
                      {parts.map((part, index) => (
                        <Typography 
                        
                          key={index}
                          component="span"
                          variant="subtitle2"
                          color='primary'
                          //color={part.highlight ? 'primary' : 'textPrimary'}
                        >
                          {part.text}
                        </Typography>
                      ))}
                    </Container>
                  </li>
                );
              }}
        />
    );
  }