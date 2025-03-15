import { ctx } from "..";
import { Vector2D } from "../types";

type YAxisSettings = {
  title: string;
  label: string;
  unit: string;
  maxValue: number;
  steps: number;
  showUnit?: boolean;
  bordered?: boolean;
};

type BarsSettings = {
  label: string;
  value: number;
  color?: string;
  visible?: boolean;
};

type BarChartProps = {
  yAxis: YAxisSettings;
  bars: BarsSettings[];
};

class BarChart {
  private static CHART_MINIMUM: Vector2D = { x: 200, y: 100 };
  private static CHART_MAXIMUM: Vector2D = { x: 1400, y: 800 };

  private static CHART_TITLE_FONT = '32px sans-serif';
  private static CHART_TITLE_COLOR = 'black';

  private static CHART_BOUNDARY_COLOR = 'black';
  private static CHART_BOUNDARY_WIDTH = 3;

  private static CHART_STEPS_FONT = '20px sans-serif';
  private static CHART_STEPS_COLOR = 'grey';
  private static CHART_STEPS_WIDTH = 1;
  private static CHART_STEPS_DASHED_SEGMENTS = [10, 10];

  private static CHART_Y_AXIS_LABEL_FONT = '32px sans-serif';
  private static CHART_Y_AXIS_LABEL_COLOR = 'black';

  private static CHART_BARS_DEFAULT_COLOR = 'black';
  private static CHART_BARS_SPACING = 20;
  private static CHART_BARS_BORDER_WIDTH = 2;
  private static CHART_BARS_BORDER_COLOR = 'black';
  private static CHART_X_AXIS_LABEL_FONT = '16px sans-serif';
  private static CHART_X_AXIS_LABEL_COLOR = 'black';

  private yAxis: YAxisSettings;
  private bars: BarsSettings[];

  constructor(props: BarChartProps) {
    const { yAxis, bars } = props;
    this.yAxis = {
      ...yAxis,
      showUnit:  yAxis.showUnit || true,
    };
    this.bars = bars;
  }

  private drawTitle() {
    ctx.textAlign = 'center';
    ctx.font = BarChart.CHART_TITLE_FONT;
    ctx.fillStyle = BarChart.CHART_TITLE_COLOR;
    ctx.fillText(this.yAxis.title, 700, 50);
  }

  private drawChartBoundaries() {
    ctx.strokeStyle = BarChart.CHART_BOUNDARY_COLOR;
    ctx.lineWidth = BarChart.CHART_BOUNDARY_WIDTH;

    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(BarChart.CHART_MINIMUM.x, BarChart.CHART_MINIMUM.y);
    ctx.lineTo(BarChart.CHART_MINIMUM.x, BarChart.CHART_MAXIMUM.y);
    ctx.lineTo(BarChart.CHART_MAXIMUM.x, BarChart.CHART_MAXIMUM.y);
    ctx.stroke();
    ctx.closePath();
  }

  private drawStepLines() {
    ctx.strokeStyle = BarChart.CHART_STEPS_COLOR;
    ctx.lineWidth = BarChart.CHART_STEPS_WIDTH;

    const { maxValue, steps, unit } = this.yAxis;
    const totalSteps = maxValue;
    const amountOfLines = totalSteps / steps;
    const spacingBetweenLines = (BarChart.CHART_MAXIMUM.y - BarChart.CHART_MINIMUM.y) / amountOfLines;

    ctx.setLineDash(BarChart.CHART_STEPS_DASHED_SEGMENTS);
    for (let i = 1; i <= amountOfLines; ++i) {
      ctx.beginPath();
      ctx.moveTo(BarChart.CHART_MINIMUM.x, BarChart.CHART_MAXIMUM.y - (i * spacingBetweenLines));
      ctx.lineTo(BarChart.CHART_MAXIMUM.x, BarChart.CHART_MAXIMUM.y - (i * spacingBetweenLines));
      ctx.stroke();
      ctx.closePath();
    }

    ctx.fillStyle = BarChart.CHART_Y_AXIS_LABEL_COLOR;
    ctx.font = BarChart.CHART_STEPS_FONT;
    ctx.textAlign = 'right';
    let stepValue = 0;
    for (let i = 1; i <= amountOfLines; ++i) {
      stepValue += steps;
      const text = `${stepValue.toString()} ${unit}`;
      ctx.fillText(text, BarChart.CHART_MINIMUM.x - 15, BarChart.CHART_MAXIMUM.y - (i * spacingBetweenLines));
    }
  }

  private drawYAxisSubject() {
    const { label } = this.yAxis;

    ctx.save();
    ctx.font = BarChart.CHART_Y_AXIS_LABEL_FONT;
    ctx.fillStyle = BarChart.CHART_Y_AXIS_LABEL_COLOR;
    ctx.textAlign = 'center';
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(label, -400, 50);
    ctx.restore();
  }

  private drawBars() {
    const { maxValue, steps, bordered = true } = this.yAxis;
    const totalSteps = maxValue;
    const amountOfLines = totalSteps / steps;
    const spacingBetweenLines = (BarChart.CHART_MAXIMUM.y - BarChart.CHART_MINIMUM.y) / amountOfLines;
    const heightPerValue = spacingBetweenLines / steps;
    const width = ((BarChart.CHART_MAXIMUM.x - BarChart.CHART_MINIMUM.x - (BarChart.CHART_BARS_SPACING * this.bars.length)) / this.bars.length);

    this.bars.forEach((bar, index) => {
      const { label, value, color = BarChart.CHART_BARS_DEFAULT_COLOR, visible = true } = bar;

      ctx.fillStyle = visible ? color : 'rgba(0, 0, 0, 0)';

      const height = (value * heightPerValue);
      const startEdge: Vector2D = {
        x: BarChart.CHART_MINIMUM.x + BarChart.CHART_BARS_SPACING + (BarChart.CHART_BARS_SPACING * index) + (width * index),
        y: BarChart.CHART_MAXIMUM.y - height,
      };

      ctx.beginPath();
      ctx.fillRect(startEdge.x, startEdge.y, width, height);

      if (bordered) {
        ctx.setLineDash(!visible ? BarChart.CHART_STEPS_DASHED_SEGMENTS : []);
        ctx.lineWidth = BarChart.CHART_BARS_BORDER_WIDTH;
        ctx.strokeStyle = BarChart.CHART_BARS_BORDER_COLOR;
        ctx.moveTo(startEdge.x, startEdge.y + height);
        ctx.lineTo(startEdge.x, startEdge.y);
        ctx.lineTo(startEdge.x + width, startEdge.y);
        ctx.lineTo(startEdge.x + width, startEdge.y + height);
        ctx.stroke();
      }

      ctx.closePath();

      ctx.save();
      ctx.font = BarChart.CHART_X_AXIS_LABEL_FONT;
      ctx.fillStyle = BarChart.CHART_X_AXIS_LABEL_COLOR;
      ctx.translate(startEdge.x + (width / 2) + 20, BarChart.CHART_MAXIMUM.y + 20);
      ctx.rotate(-Math.PI / 6);
      ctx.textAlign = 'right';
      ctx.fillText(label, 0, 0);
      ctx.restore();
    });
  }

  render() {
    this.drawTitle();
    this.drawChartBoundaries();
    this.drawStepLines();
    this.drawYAxisSubject();
    this.drawBars();
  }
}

export default BarChart;
