import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'reactstrap';
import Dropzone from 'react-dropzone';


class FileUploader extends Component {
    static defaultProps = {
        showPreview: true,
    };

    constructor(props) {
        super(props);
        this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);

        this.state = {
            selectedFiles: [],
        };
    }

    /**
     * Handled the accepted files and shows the preview
     */
    handleAcceptedFiles = (files) => {
        var allFiles = files;

        if (this.props.showPreview) {
            files.map(file =>
                Object.assign(file, {
                    preview: file['type'].split('/')[0] === 'image' ? URL.createObjectURL(file) : null,
                    formattedSize: this.formatBytes(file.size),
                })
            );

            allFiles = this.state.selectedFiles;
            allFiles.push(...files);
            this.setState({ selectedFiles: allFiles });
        }

        if (this.props.onFileUpload) this.props.onFileUpload(allFiles);
    };

    /**
     * Formats the size
     */
    formatBytes = (bytes, decimals) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    render() {
        return (
            <React.Fragment>
                <Dropzone onDrop={acceptedFiles => this.handleAcceptedFiles(acceptedFiles)} {...this.props}>
                    {({ getRootProps, getInputProps }) => (
                        <div className="dropzone text-center">
                            <div className="dz-message py-5 needsclick" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <i className="h1 text-muted uil-cloud-upload"></i>
                                <h3>Drop files here or click to upload.</h3>
                                <span className="text-muted font-13">
                                    (This is just a demo dropzone. Selected files are <strong>not</strong> actually
                                    uploaded.)
                                </span>
                            </div>
                        </div>
                    )}
                </Dropzone>

                {this.props.showPreview && (
                    <div className="dropzone-previews mt-3" id="file-previews">
                        {this.state.selectedFiles.map((f, i) => {
                            return (
                                <Card
                                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                    key={i + '-file'}>
                                    <div className="p-2">
                                        <Row className="align-items-center">
                                            {f.preview && (
                                                <Col className="col-auto">
                                                    <img
                                                        data-dz-thumbnail=""
                                                        className="avatar-sm rounded bg-light"
                                                        alt={f.name}
                                                        src={f.preview}
                                                    />
                                                </Col>
                                            )}
                                            {!f.preview && (
                                                <Col className="col-auto">
                                                    <div className="avatar-sm">
                                                        <span className="avatar-title bg-primary rounded">
                                                            {f.type.split('/')[0]}
                                                        </span>
                                                    </div>
                                                </Col>
                                            )}
                                            <Col className="pl-0">
                                                <Link to="#" className="text-muted font-weight-bold">
                                                    {f.name}
                                                </Link>
                                                <p className="mb-0">
                                                    <strong>{f.formattedSize}</strong>
                                                </p>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default FileUploader;
