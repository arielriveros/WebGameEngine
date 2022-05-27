export class Performance
{
    private _previousTime: number;
    private _time: number;
    private _showPerformance: boolean;

    public constructor()
    {
        this._previousTime = 0;
        this._time = 0;
        this._showPerformance = true;
    }

    public get previousTime(): number { return this._previousTime; }
    public get time(): number { return this._time; }
    public get showPerformance(): boolean { return this._showPerformance; }
    public set showPerformance(showPerformance: boolean) { this._showPerformance = showPerformance; }


    public measure(): number
    {
        if(!this._previousTime)
        {
            this._previousTime = performance.now();
            this._time = 0;
        }
        let delta = (performance.now() - this._previousTime);
        this._previousTime = performance.now();
        this._time = delta;
        return delta;
    }

    public sendToHUD()
    {
        let fpsMeter = document.getElementById('fps-meter') as HTMLDivElement;
        fpsMeter.textContent = (1000/this._time).toFixed(2).toString();

        let frameTimeMeter = document.getElementById('frametime-meter') as HTMLDivElement;
        frameTimeMeter.textContent = this._time.toFixed(2).toString() + ' ms';
    }
}