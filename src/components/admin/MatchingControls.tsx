import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { UrgentRequests } from './UrgentRequests';

interface MatchingControlsProps {
  matchThreshold: number;
  setMatchThreshold: (value: number) => void;
}

export const MatchingControls = ({ matchThreshold, setMatchThreshold }: MatchingControlsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Matching Algorithm</CardTitle>
          <CardDescription>Adjust matching parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Match Threshold</Label>
                <span className="text-sm font-medium">{matchThreshold}%</span>
              </div>
              <Slider
                value={[matchThreshold]}
                min={50}
                max={95}
                step={5}
                onValueChange={(value) => setMatchThreshold(value[0])}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-2">Minimum score to suggest a match</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center space-x-2">
                  <span>Prioritize personality fit</span>
                </Label>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="flex items-center space-x-2">
                  <span>Weigh experience heavily</span>
                </Label>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="flex items-center space-x-2">
                  <span>Consider location proximity</span>
                </Label>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="flex items-center space-x-2">
                  <span>Language match required</span>
                </Label>
                <Switch checked={true} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button className="w-full bg-purple-600 hover:bg-purple-700">Apply Changes</Button>
        </CardFooter>
      </Card>
      
      <UrgentRequests />
    </div>
  );
};
