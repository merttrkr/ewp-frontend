import _ from "lodash";
import React, { PureComponent, ReactNode } from "react";
import ReactResizeDetector from "react-resize-detector";
import SignaturePad from "react-signature-pad-wrapper";

interface SignatureProps {
  value?: string;
  style?: any;
  onChange?: (value: string) => void;
  throttle?: number;
  dotSize?: number;
  id?: string;
}

interface SignatureState {}

export class Signature extends PureComponent<SignatureProps, SignatureState> {
  private sigCanvas:any;

  private sigCanvasWrapper:any;

  constructor(props: SignatureProps) {
    super(props);
    this.sigCanvas = React.createRef();
    this.sigCanvasWrapper = React.createRef();
  }

  begin = (value: any) => {
    this.sigCanvas.current.clear();
    // if (value) {
    //   this.sigCanvas.current.fromDataURL(value);
    // }
  };

  end = () => {
    if (this.props.onChange) {
      if (this.sigCanvas.current) {
        if (this.sigCanvas.current?.isEmpty() === true) {
          this.props.onChange("");
        } else {
          const dataURL = this.sigCanvas.current?.toDataURL("image/png");
          this.props.onChange(dataURL);
        }
      }
    }
  };

  getStyleProp = () => {
    const defaultStyle: any = {
      width: "100%",
      height: "300px"
    };
    let style: any = {};
    if (this.props.style) {
      style = _.clone(this.props.style);
      if (!style.width) {
        style.width = defaultStyle.width;
      }
      if (!style.height) {
        style.height = defaultStyle.height;
      }
    } else {
      style = defaultStyle;
    }
    return style;
  };

  getColor = () => {
    const style = this.getStyleProp();
    if (style && style.color) {
      return style.color;
    }
    return "black";
  };

  getBgColor = () => {
    const style = this.getStyleProp();
    if (style && style.backgroundColor) {
      return style.backgroundColor;
    }
    return "white";
  };

  waitAndResize = _.debounce((width?: number, height?: number) => {
    this.handleResize(width, height);
  }, 50);

  handleResize = (width?: number, height?: number) => {
    // this.sigCanvas.current.clear();
    if (this.sigCanvasWrapper.current && this.sigCanvas.current && this.sigCanvas.current.canvasRef.current) {
      if (width === undefined || width === 0 || height === undefined || height === 0) {
        const wrapperRect = this.sigCanvasWrapper.current.getBoundingClientRect();
        width = wrapperRect.width;
        height = wrapperRect.height;
      }
      this.sigCanvas.current.width = width;
      this.sigCanvas.current.height = height;
      this.sigCanvas.current.canvasRef.current.width = width;
      this.sigCanvas.current.canvasRef.current.height = height;
    }
  };

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps = (nextProps: SignatureProps) => {
    if (nextProps.value === undefined || nextProps.value === "") {
      this.sigCanvas.current.clear();
    }
    if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
      // this.begin(nextProps.value);
    }
  };

  render(): ReactNode {
    return (
      <>
        <ReactResizeDetector handleWidth handleHeight onResize={this.waitAndResize}>
          {({ width, height }) => (
            <div ref={this.sigCanvasWrapper} style={this.getStyleProp()} className="kuika-canvas-input">
              <SignaturePad
                redrawOnResize
                options={{
                  throttle: this.props.throttle,
                  dotSize: this.props.dotSize,
                  penColor: this.getColor(),
                  backgroundColor: this.getBgColor(),
                }}
                ref={this.sigCanvas}
              />
              {width}
            </div>
          )}
        </ReactResizeDetector>
      </>
    );
  }
}
