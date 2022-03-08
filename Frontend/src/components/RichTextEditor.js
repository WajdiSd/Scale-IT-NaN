import React, { Component } from 'react';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class RichTextEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
        };

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }

    componentDidMount(prevProps) {
        if (this.props.initialContent) {
            const { contentBlocks, entityMap } = htmlToDraft(this.props.initialContent);
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            this.setState({ editorState: EditorState.createWithContent(contentState) });
        }
    }

    /**
     * On editor body change
     */
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
        const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.props.onEditorContentChange && this.props.onEditorContentChange(body);
    };

    render() {
        return (
            <React.Fragment>

                <Editor
                    editorState={this.state.editorState}
                    wrapperClassName="rich-editor-wrapper"
                    editorClassName="rich-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbarClassName={this.props.hideToolbar ? 'hide-toolbar' : ''}
                />

            </React.Fragment>
        )
    }
}


export default RichTextEditor;