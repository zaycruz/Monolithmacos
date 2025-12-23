import { Bell, Globe, Palette, Shield, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

export function SettingsView() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="text-[20px] mb-2">Settings</div>
          <div className="text-[13px] text-muted-text">Configure AssistantOS preferences</div>
        </div>

        <div className="space-y-6">
          {/* General */}
          <div className="bg-surface rounded-[10px] p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-4 h-4 text-primary-accent" />
              <div className="text-[16px]">General</div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px]">Auto-start agents on boot</div>
                  <div className="text-[11px] text-muted-text">
                    Automatically initialize agents when system starts
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px]">Real-time updates</div>
                  <div className="text-[11px] text-muted-text">
                    Stream task progress and agent updates
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px]">Verbose logging</div>
                  <div className="text-[11px] text-muted-text">
                    Include detailed debug information in logs
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-surface rounded-[10px] p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-4 h-4 text-primary-accent" />
              <div className="text-[16px]">Notifications</div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px]">Task completion</div>
                  <div className="text-[11px] text-muted-text">
                    Notify when tasks complete successfully
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px]">Task blocked</div>
                  <div className="text-[11px] text-muted-text">
                    Alert when tasks require user input
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px]">Agent errors</div>
                  <div className="text-[11px] text-muted-text">
                    Notify on agent failures or timeouts
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-surface rounded-[10px] p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-4 h-4 text-primary-accent" />
              <div className="text-[16px]">Performance</div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px]">Max concurrent agents</div>
                  <div className="text-[11px] text-muted-text">
                    Number of agents that can run simultaneously
                  </div>
                </div>
                <select className="bg-background border border-border rounded-lg px-3 py-1.5 text-[13px]">
                  <option value="2">2</option>
                  <option value="4" selected>
                    4
                  </option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px]">Resource throttling</div>
                  <div className="text-[11px] text-muted-text">
                    Limit CPU/RAM usage to prevent system overload
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-surface rounded-[10px] p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-4 h-4 text-primary-accent" />
              <div className="text-[16px]">Appearance</div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px]">Theme</div>
                  <div className="text-[11px] text-muted-text">
                    Interface color scheme
                  </div>
                </div>
                <select className="bg-background border border-border rounded-lg px-3 py-1.5 text-[13px]">
                  <option value="dark" selected>
                    Dark
                  </option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px]">Compact mode</div>
                  <div className="text-[11px] text-muted-text">
                    Reduce spacing for denser information display
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-surface rounded-[10px] p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-4 h-4 text-primary-accent" />
              <div className="text-[16px]">Security</div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px]">Require confirmation for destructive actions</div>
                  <div className="text-[11px] text-muted-text">
                    Ask before killing tasks or terminating agents
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px]">Kernel connection security</div>
                  <div className="text-[11px] text-muted-text">
                    Enforce TLS for MonolithOS connections
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="default" className="bg-primary-accent hover:bg-primary-accent/90">
              Save Changes
            </Button>
            <Button variant="outline">Reset to Defaults</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
