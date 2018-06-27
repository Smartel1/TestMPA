<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class OrderStatusChanged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $id, $status;


    public function __construct($id, $status)
    {
        $this->id=$id;
        $this->status=$status;
    }

    public function broadcastOn()
    {
        return 'orders.channel';
    }

    public function broadcastAs()
    {
        return 'order.status.changed';
    }
}
