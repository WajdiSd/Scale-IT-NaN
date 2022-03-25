import { useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography, Autocomplete, InputAdornment, Popper } from '@mui/material';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import InputStyle from '../../../components/InputStyle';
import SearchNotFound from '../../../components/SearchNotFound';
import useWorkspace from 'src/hooks/useWorkspace';
import { useSnackbar } from 'notistack';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  
});

// ----------------------------------------------------------------------

export default function MemberSearchAutocomplete({handleSetTeamLeadId}) {
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();


  const {id} = useParams();

  const { usersInWorkspace } = useWorkspace();

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState([]);
  
  const [assignedUsers, setAssignedUsers] = useState(usersInWorkspace);

  const handleChangeSearch = async (value) => {
    try {
      setSearchQuery(value);
      if (value) {
        if (isMountedRef.current) {
          const res = usersInWorkspace?.filter(member => {
            if(member.firstName.toLowerCase().includes(value.toLowerCase())
              || member.lastName.toLowerCase().includes(value.toLowerCase())){
              return member;
            }
            
            });
            console.log(res);
          setSearchResults(res)
          }
           
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Autocomplete
      size="medium"
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={searchResults}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(member) => member.firstName+' '+member.lastName}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      renderInput={(params) => (
        <InputStyle
          {...params}
          placeholder="Search members..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, member, { inputValue }) => {
        console.log("member");
        const { firstName, lastName, _id } = member;
        const suggestionText = `${firstName} ${lastName}`;

        let matches = match(suggestionText, inputValue);
        let parts = parse(suggestionText, matches);
        return (
          <li {...props}>
            {/*<Image alt={cover} src={cover} sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }} />*/}
            <Link underline="none" onClick={() => {handleSetTeamLeadId(_id)}}>
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
            </Link>
          </li>
        );
      }}
    />
  );
}
